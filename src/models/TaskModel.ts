export interface TaskModel {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  start: Date;
  end: Date;
  uids: string[];
  color?: string;
  attachments: AttachmentModel[];
  progress?: number;
}

export interface AttachmentModel {
  name: string;
  url: string;
  size: number;
  type?: string;
}
