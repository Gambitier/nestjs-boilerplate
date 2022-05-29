import { SetMetadata } from '@nestjs/common';

export const AUDIT_KEY = 'AUDIT';
export const Audit = (args: AuditMetadata) => SetMetadata(AUDIT_KEY, args);

export type AuditMetadata = { AuditKey: string };
