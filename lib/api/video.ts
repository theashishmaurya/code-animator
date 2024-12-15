import { toPng } from 'html-to-image';

export async function captureFrame(element: HTMLElement): Promise<string> {
  try {
    const dataUrl = await toPng(element);
    return dataUrl;
  } catch (error) {
    console.error('Error capturing frame:', error);
    throw new Error('Failed to capture frame');
  }
}