import * as QrCode from 'qrcode';

export async function generateQRCodeForURL(url: string): Promise<string> {
  const code = await QrCode.toDataURL(url);
  return code;
}
