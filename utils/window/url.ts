export const getUrl = (file: any) => (window.URL ? URL : webkitURL).createObjectURL(file as any);
