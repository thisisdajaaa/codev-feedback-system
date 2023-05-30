export const downloadCSV = <T extends Record<string, any>>(
  data: T,
  filename: string
): void => {
  const dataArray = Array.isArray(data) ? data : [data];

  const csvRows: string[] = [];
  const headers = Object.keys(dataArray[0]);
  csvRows.push(headers.join(","));

  for (const row of dataArray) {
    const values = headers.map((header) => {
      let value = row[header];

      if (typeof value === "object") {
        value = JSON.stringify(value);
      }

      const escaped = ("" + value).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });

    csvRows.push(values.join(","));
  }

  const csvData = csvRows.join("\n");

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `${filename}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
