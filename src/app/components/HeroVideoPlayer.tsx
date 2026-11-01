"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type HeroVideoPlayerProps = {
  src: string;
  poster?: string | null;
  title?: string | null;
};

type PlayerState = "idle" | "playing" | "paused";

type WebkitDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => void;
};

type WebkitElement = HTMLElement & { webkitRequestFullscreen?: () => void };
type WebkitVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

const formatTime = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const fullscreenElement = () => {
  const doc = document as WebkitDocument;
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
};

const exitFullscreen = () => {
  const doc = document as WebkitDocument;
  if (doc.exitFullscreen) void doc.exitFullscreen().catch(() => undefined);
  else doc.webkitExitFullscreen?.();
};

/**
 * Homepage intro video. It waits on the poster with a play button; one click plays it
 * with sound. Corner controls (sound, pause, full screen) show on hover with a mouse,
 * and for a few seconds after a tap on touch screens.
 */
export function HeroVideoPlayer({ src, poster, title }: HeroVideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<WebkitVideo>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const hideTimer = useRef<number | undefined>(undefined);

  const [state, setState] = useState<PlayerState>("idle");
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const doc = document as WebkitDocument;
    const pageFullscreen = Boolean(doc.fullscreenEnabled || doc.webkitFullscreenEnabled);
    setCanFullscreen(pageFullscreen || Boolean(videoRef.current?.webkitEnterFullscreen));
    setIsTouch(window.matchMedia("(hover: none)").matches);
    // The video can load its length before the page becomes interactive
    if (videoRef.current && videoRef.current.readyState >= 1) {
      setDuration(videoRef.current.duration);
    }

    const onFullscreenChange = () => setIsFull(fullscreenElement() === playerRef.current);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      window.clearTimeout(hideTimer.current);
    };
  }, []);

  // A thin progress line runs along the bottom while it plays
  useEffect(() => {
    if (state !== "playing") return;
    let frame = 0;
    const tick = () => {
      const video = videoRef.current;
      if (video && barRef.current && video.duration) {
        barRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [state]);

  // On touch screens the controls show for a few seconds after a tap, and stay while paused
  const revealControls = (autoHide = true) => {
    setShowControls(true);
    window.clearTimeout(hideTimer.current);
    if (autoHide && videoRef.current && !videoRef.current.paused) {
      hideTimer.current = window.setTimeout(() => setShowControls(false), 2800);
    }
  };

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
    video.play().catch(() => setState(video.currentTime ? "paused" : "idle"));
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) play();
    else video.pause();
  };

  const onSurfaceClick = () => {
    if (state === "idle") return play();
    // First tap on a phone reveals the controls; with a mouse a click pauses or plays
    if (isTouch && state === "playing" && !showControls) return revealControls();
    togglePlay();
  };

  const toggleMuted = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (isTouch) revealControls();
  };

  // Full screen: the whole player where the browser allows it, otherwise the phone's own video viewer
  const toggleFullscreen = () => {
    const player = playerRef.current as WebkitElement | null;
    const video = videoRef.current;
    if (!player || !video) return;
    if (fullscreenElement()) return exitFullscreen();

    const doc = document as WebkitDocument;
    if (doc.fullscreenEnabled && player.requestFullscreen) {
      player.requestFullscreen().catch(() => video.webkitEnterFullscreen?.());
    } else if (doc.webkitFullscreenEnabled && player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen();
    } else {
      video.webkitEnterFullscreen?.();
    }
  };

  // At the end, go back to the poster and the play button
  const onEnded = () => {
    const video = videoRef.current;
    if (fullscreenElement()) exitFullscreen();
    video?.load();
    setState("idle");
    setCurrentTime(0);
    setShowControls(false);
    if (barRef.current) barRef.current.style.transform = "scaleX(0)";
  };

  const remaining = duration ? formatTime(duration - currentTime) : "";

  return (
    <div
      className={clsx(
        "hero-video-player",
        muted && "is-muted",
        isFull && "is-full",
        showControls && "show-controls",
      )}
      data-state={state}
      ref={playerRef}
      style={poster ? { backgroundImage: `url("${poster}")` } : undefined}
    >
      <video
        aria-label={title ?? undefined}
        onEnded={onEnded}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onPause={(event) => {
          if (event.currentTarget.ended) return;
          setState("paused");
          if (isTouch) revealControls(false);
        }}
        onPlay={() => {
          setState("playing");
          if (isTouch && showControls) revealControls();
        }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        playsInline
        poster={poster ?? undefined}
        preload="metadata"
        ref={videoRef}
        src={src}
      />
      <button
        aria-hidden="true"
        className="hero-video-player__surface"
        onClick={onSurfaceClick}
        tabIndex={-1}
        type="button"
      />
      <button
        aria-label="Play the video with sound"
        className="hero-video-player__play"
        onClick={play}
        type="button"
      >
        <span className="hero-video-player__play-icon">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M8.5 6.2v11.6L18 12 8.5 6.2Z" />
          </svg>
        </span>
        {duration ? (
          <span className="hero-video-player__play-time">
            {formatTime(state === "idle" ? duration : duration - currentTime)}
          </span>
        ) : null}
      </button>
      <div className="hero-video-player__controls">
        <button
          aria-label={muted ? "Turn sound on" : "Mute"}
          className="hero-video-player__pill"
          onClick={toggleMuted}
          type="button"
        >
          {muted ? (
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" />
              <path d="m16 9.5 5 5m0-5-5 5" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" />
              <path
                className="hero-video-player__wave"
                d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11"
              />
            </svg>
          )}
          {remaining ? (
            <span className="hero-video-player__time">{`−${remaining}`}</span>
          ) : null}
        </button>
        <button
          aria-label={state === "playing" ? "Pause" : "Play"}
          className="hero-video-player__round"
          onClick={() => {
            togglePlay();
            if (isTouch) revealControls();
          }}
          type="button"
        >
          {state === "playing" ? (
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M9 6.5v11M15 6.5v11" />
            </svg>
          ) : (
            <svg aria-hidden="true" className="is-filled" viewBox="0 0 24 24">
              <path d="M8.5 6.2v11.6L18 12 8.5 6.2Z" />
            </svg>
          )}
        </button>
        {canFullscreen ? (
          <button
            aria-label={isFull ? "Exit full screen" : "Full screen"}
            className="hero-video-player__round"
            onClick={toggleFullscreen}
            type="button"
          >
            {isFull ? (
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M9 4.5V9H4.5M19.5 9H15V4.5M15 19.5V15h4.5M4.5 15H9v4.5" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M4.5 9V4.5H9M15 4.5h4.5V9M19.5 15v4.5H15M9 19.5H4.5V15" />
              </svg>
            )}
          </button>
        ) : null}
      </div>
      <div aria-hidden="true" className="hero-video-player__progress">
        <span ref={barRef} />
      </div>
    </div>
  );
}
