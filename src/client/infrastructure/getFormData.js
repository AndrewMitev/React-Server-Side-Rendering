export const getFormData = (payload) => {
    const formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
  
    return formData;
  };