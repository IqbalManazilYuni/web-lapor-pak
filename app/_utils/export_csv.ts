/* eslint-disable @typescript-eslint/no-explicit-any */
import { Parser } from 'json2csv';

export function exportToCSV(data: any[], filename: string = 'data.csv') {
    const parser = new Parser();
    const csv = parser.parse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
