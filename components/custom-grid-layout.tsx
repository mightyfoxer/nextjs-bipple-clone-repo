import * as React from "react";
import type { TrackReferenceOrPlaceholder } from "@livekit/components-core";
import {
  TrackLoop,
  UseParticipantsOptions,
  useGridLayout,
  usePagination,
  useSwipe,
} from "@livekit/components-react";
import { CustomPaginationControl } from "./custom-pagination-control";

/** @public */
export interface GridLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<UseParticipantsOptions, "updateOnlyOn"> {
  children: React.ReactNode;
  tracks: TrackReferenceOrPlaceholder[];
}

/**
 * The `GridLayout` component displays the nested participants in a grid where every participants has the same size.
 * It also supports pagination if there are more participants than the grid can display.
 * @remarks
 * To ensure visual stability when tiles are reordered due to track updates,
 * the component uses the `useVisualStableUpdate` hook.
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <GridLayout tracks={tracks}>
 *     <ParticipantTile />
 *   </GridLayout>
 * <LiveKitRoom>
 * ```
 * @public
 */
export function CustomGridLayout({ tracks, ...props }: GridLayoutProps) {
  const gridEl = React.createRef<HTMLDivElement>();

  const { layout } = useGridLayout(gridEl, tracks.length);
  const pagination = usePagination(50, tracks);

  useSwipe(gridEl, {
    onLeftSwipe: pagination.nextPage,
    onRightSwipe: pagination.prevPage,
  });

  return (
    <div data-lk-pagination={false} className="flex flex-col w-full gap-2 px-2">
      <TrackLoop tracks={pagination.tracks}>{props.children}</TrackLoop>
    </div>
  );
}

export interface PaginationIndicatorProps {
  totalPageCount: number;
  currentPage: number;
}

export function PaginationIndicator({
  totalPageCount,
  currentPage,
}: PaginationIndicatorProps) {
  const bubbles = new Array(totalPageCount).fill("").map((_, index) => {
    if (index + 1 === currentPage) {
      return <span data-lk-active key={index} />;
    } else {
      return <span key={index} />;
    }
  });

  return <div className="lk-pagination-indicator">{bubbles}</div>;
}
