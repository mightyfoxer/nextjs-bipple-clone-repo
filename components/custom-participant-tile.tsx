import * as React from "react";
import type { Participant, TrackPublication } from "livekit-client";
import { Track } from "livekit-client";
import type {
  ParticipantClickEvent,
  TrackReferenceOrPlaceholder,
} from "@livekit/components-core";
import {
  isTrackReference,
  isTrackReferencePinned,
} from "@livekit/components-core";
import {
  AudioTrack,
  ConnectionQualityIndicator,
  FocusToggle,
  LockLockedIcon,
  ParticipantContext,
  ParticipantName,
  ParticipantPlaceholder,
  ScreenShareIcon,
  TrackMutedIndicator,
  TrackRefContext,
  VideoTrack,
  useEnsureParticipant,
  useFeatureContext,
  useIsEncrypted,
  useMaybeLayoutContext,
  useMaybeParticipantContext,
  useMaybeTrackRefContext,
  useParticipantTile,
} from "@livekit/components-react";
import { SpeakerInfo } from "livekit-server-sdk/dist/proto/livekit_models";
import { FaMicrophone } from "react-icons/fa";

/**
 * The `ParticipantContextIfNeeded` component only creates a `ParticipantContext`
 * if there is no `ParticipantContext` already.
 * @example
 * ```tsx
 * <ParticipantContextIfNeeded participant={trackReference.participant}>
 *  ...
 * </ParticipantContextIfNeeded>
 * ```
 * @public
 */
export function ParticipantContextIfNeeded(
  props: React.PropsWithChildren<{
    participant?: Participant;
  }>
) {
  const hasContext = !!useMaybeParticipantContext();
  return props.participant && !hasContext ? (
    <ParticipantContext.Provider value={props.participant}>
      {props.children}
    </ParticipantContext.Provider>
  ) : (
    <>{props.children}</>
  );
}

/**
 * Only create a `TrackRefContext` if there is no `TrackRefContext` already.
 */
function TrackRefContextIfNeeded(
  props: React.PropsWithChildren<{
    trackRef?: TrackReferenceOrPlaceholder;
  }>
) {
  const hasContext = !!useMaybeTrackRefContext();
  return props.trackRef && !hasContext ? (
    <TrackRefContext.Provider value={props.trackRef}>
      {props.children}
    </TrackRefContext.Provider>
  ) : (
    <>{props.children}</>
  );
}

/** @public */
export interface ParticipantTileProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The track reference to display. */
  trackRef?: TrackReferenceOrPlaceholder;
  disableSpeakingIndicator?: boolean;
  /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
  participant?: Participant;
  /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
  source?: Track.Source;
  /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
  publication?: TrackPublication;
  onParticipantClick?: (event: ParticipantClickEvent) => void;
}

/**
 * The `ParticipantTile` component is the base utility wrapper for displaying a visual representation of a participant.
 * This component can be used as a child of the `TrackLoop` component or by passing a track reference as property.
 *
 * @example Using the `ParticipantTile` component with a track reference:
 * ```tsx
 * <ParticipantTile trackRef={trackRef} />
 * ```
 * @example Using the `ParticipantTile` component as a child of the `TrackLoop` component:
 * ```tsx
 * <TrackLoop>
 *  <ParticipantTile />
 * </TrackLoop>
 * ```
 * @public
 */
export function CustomParticipantTile({
  trackRef,
  participant,
  children,
  source = Track.Source.Camera,
  onParticipantClick,
  publication,
  disableSpeakingIndicator,
  ...htmlProps
}: ParticipantTileProps) {
  // TODO: remove deprecated props and refactor in a future version.
  const maybeTrackRef = useMaybeTrackRefContext();
  const p = useEnsureParticipant(participant);
  const trackReference: TrackReferenceOrPlaceholder = React.useMemo(() => {
    return {
      participant: trackRef?.participant ?? maybeTrackRef?.participant ?? p,
      source: trackRef?.source ?? maybeTrackRef?.source ?? source,
      publication:
        trackRef?.publication ?? maybeTrackRef?.publication ?? publication,
    };
  }, [maybeTrackRef, p, publication, source, trackRef]);
  const isSpeaking = trackReference.participant.isSpeaking;

  const { elementProps } = useParticipantTile<HTMLDivElement>({
    participant: trackReference.participant,
    htmlProps,
    source: trackReference.source,
    publication: trackReference.publication,
    disableSpeakingIndicator,
    onParticipantClick,
  });
  const isEncrypted = useIsEncrypted(p);
  const layoutContext = useMaybeLayoutContext();

  const autoManageSubscription = useFeatureContext()?.autoSubscription;

  const handleSubscribe = React.useCallback(
    (subscribed: boolean) => {
      if (
        trackReference.source &&
        !subscribed &&
        layoutContext &&
        layoutContext.pin.dispatch &&
        isTrackReferencePinned(trackReference, layoutContext.pin.state)
      ) {
        layoutContext.pin.dispatch({ msg: "clear_pin" });
      }
    },
    [trackReference, layoutContext]
  );

  const isCameraEnabled =
    trackReference.publication?.track?.on &&
    trackReference.source === Track.Source.Camera;
  const isMicrophoneEnabled =
    trackReference.publication?.track?.on &&
    trackReference.source === Track.Source.Microphone;

  return (
    <div style={{ position: "relative" }} {...elementProps}>
      <TrackRefContextIfNeeded trackRef={trackReference}>
        <ParticipantContextIfNeeded participant={trackReference.participant}>
          {children ?? (
            <>
              {/*
 {isCameraEnabled && isTrackReference(trackReference) && (
                <VideoTrack
                  trackRef={trackReference}
                  onSubscriptionStatusChanged={handleSubscribe}
                  manageSubscription={autoManageSubscription}
                />
              )}

              {isMicrophoneEnabled && isTrackReference(trackReference) && (
                <AudioTrack
                  trackRef={trackReference}
                  onSubscriptionStatusChanged={handleSubscribe}
                />
              )}
              */}

              <div className="">
                {trackReference.source === Track.Source.Camera ? (
                  <>
                    <div className="flex items-center justify-start w-full gap-2 px-1 py-2">
                      <img
                        src="https://i.ibb.co/1dMWvKX/pfp.png"
                        className={
                          isSpeaking
                            ? "w-[40px] h-[40px] rounded-full img-talking "
                            : "w-[40px] h-[40px] rounded-full"
                        }
                      />
                      <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-col items-start font-bold">
                          {<ParticipantName />}
                          {isSpeaking ? (
                            <>
                              <div className="text-xs font-light text-[#4DE265]">
                                speaking..
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-xs font-light text-[#595959]">
                                listening
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {isSpeaking ? (
                            <div className="text-[#4DE265] mr-2">
                              <FaMicrophone />
                            </div>
                          ) : (
                            <>
                              <TrackMutedIndicator
                                source={Track.Source.Microphone}
                                show={"muted"}
                              ></TrackMutedIndicator>
                            </>
                          )}

                          {isEncrypted && (
                            <LockLockedIcon
                              style={{ marginRight: "0.25rem" }}
                            />
                          )}
                          {/*           <ConnectionQualityIndicator className="" /> */}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <ScreenShareIcon style={{ marginRight: "0.25rem" }} />
                    <ParticipantName>&apos;s screen</ParticipantName>
                  </>
                )}
              </div>
            </>
          )}
        </ParticipantContextIfNeeded>
      </TrackRefContextIfNeeded>
    </div>
  );
}

/*
<div style={{ position: "relative" }} {...elementProps}>
      <TrackRefContextIfNeeded trackRef={trackReference}>
        <ParticipantContextIfNeeded participant={trackReference.participant}>
          {children ?? (
            <>
              {isTrackReference(trackReference) &&
              (trackReference.publication?.kind === "video" ||
                trackReference.source === Track.Source.Camera ||
                trackReference.source === Track.Source.ScreenShare) ? (
                <VideoTrack
                  trackRef={trackReference}
                  onSubscriptionStatusChanged={handleSubscribe}
                  manageSubscription={autoManageSubscription}
                />
              ) : (
                isTrackReference(trackReference) && (
                  <AudioTrack
                    trackRef={trackReference}
                    onSubscriptionStatusChanged={handleSubscribe}
                  />
                )
              )}
              <div className="lk-participant-placeholder">
                <ParticipantPlaceholder />
              </div>
              <div className="lk-participant-metadata">
                <div className="lk-participant-metadata-item">
                  {trackReference.source === Track.Source.Camera ? (
                    <>
                      {isEncrypted && (
                        <LockLockedIcon style={{ marginRight: "0.25rem" }} />
                      )}
                      <TrackMutedIndicator
                        source={Track.Source.Microphone}
                        show={"muted"}
                      ></TrackMutedIndicator>
                      <div className="flex items-center gap-2">
                        <img src="https://i.ibb.co/1dMWvKX/pfp.png" className="w-5 h-5 rounded-full" />
                        {<ParticipantName />}
                      </div>
                    
                    </>
                  ) : (
                    <>
                      <ScreenShareIcon style={{ marginRight: "0.25rem" }} />
                      <ParticipantName>&apos;s screen</ParticipantName>
                    </>
                  )}
                </div>
                <ConnectionQualityIndicator className="lk-participant-metadata-item" />
              </div>
            </>
          )}
          <FocusToggle trackRef={trackReference} />
        </ParticipantContextIfNeeded>
      </TrackRefContextIfNeeded>
    </div>
*/
