import { getIndentation } from './utils';

interface DiffLine {
  content: string;
  type: 'unchanged' | 'changed';
  position: number;
  indentation: number;
}

export function computeCodeDiff(oldCode: string, newCode: string): DiffLine[] {
  const oldLines = oldCode.split('\n');
  const newLines = newCode.split('\n');
  
  // Create a map of line content to its positions
  const lineMap = new Map<string, { oldIndex: number; newIndex: number }>();
  
  // First pass: mark unchanged lines (ignoring indentation)
  oldLines.forEach((line, index) => {
    const trimmedLine = line.trim();
    lineMap.set(trimmedLine, { oldIndex: index, newIndex: -1 });
  });
  
  // Build the diff result
  const diff: DiffLine[] = [];
  
  newLines.forEach((line, index) => {
    const trimmedLine = line.trim();
    const indentation = getIndentation(line);
    const mapping = lineMap.get(trimmedLine);
    
    if (mapping && mapping.oldIndex !== -1) {
      // Line exists in both versions (ignoring indentation)
      diff.push({
        content: line,
        type: 'unchanged',
        position: index,
        indentation
      });
    } else {
      // Line is new or changed
      diff.push({
        content: line,
        type: 'changed',
        position: index,
        indentation
      });
    }
  });
  
  return diff;
}