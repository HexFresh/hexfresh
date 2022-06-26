export enum TaskCategory {
  SINGLE_CHOICE = 1,
  MULTIPLE_CHOICES,
  WRITTING,
  BINARY,
  MATCH_SEQUENCE,
  MATCH_CORESPONSE,
  DOCUMENT,
  ASSIGNMENT,
}

export enum TaskStatus {
  TODO,
  DOING,
  DONE,
}

export enum AttachmentStatus {
  SCANING,
  SCANNED
}

export enum NotificationType {
  CHAT = "chat",
  ANNOUNCEMENT = "announcement",
  SYSTEM = "system",
  BADGE = "badge",
}