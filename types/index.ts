export type Severity = "high" | "medium" | "low";
export type ErrorType = "intersection" | "hatching" | "text";

export interface BBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IntersectionMetadata {
  angle_1?: number;
  angle_2?: number;
}

export interface HatchingMetadata {
  contour_area?: number;
}

export interface TextMetadata {
  detected_text?: string;
  suggestion?: string;
}

export type ErrorMetadata =
  | IntersectionMetadata
  | HatchingMetadata
  | TextMetadata;

export interface QCError {
  id: string;
  type: ErrorType;
  severity: Severity;
  message: string;
  bbox: BBox;
  metadata?: ErrorMetadata;
}

export interface PageSummary {
  total_errors: number;
  intersection_errors: number;
  hatching_errors: number;
  text_errors: number;
}

export interface PageResult {
  page: number;
  summary: PageSummary;
  errors: QCError[];
}

// Helper to check metadata type
export function isTextMetadata(
  metadata: ErrorMetadata | undefined,
): metadata is TextMetadata {
  return metadata !== undefined && "detected_text" in metadata;
}

export function isIntersectionMetadata(
  metadata: ErrorMetadata | undefined,
): metadata is IntersectionMetadata {
  return metadata !== undefined && "angle_1" in metadata;
}

export function isHatchingMetadata(
  metadata: ErrorMetadata | undefined,
): metadata is HatchingMetadata {
  return metadata !== undefined && "contour_area" in metadata;
}

export type FileStatus = "uploaded" | "processing" | "done" | "error";

export interface UploadedFile {
  id: string;
  name: string;
  status: FileStatus;
  file: File;  // Add this line if it's missing
  result?: PageResult[];
}

export interface FileListProps {
  files: UploadedFile[];
  onRemove?: (id: string) => void;
}
