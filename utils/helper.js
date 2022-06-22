import { toast } from "react-toastify";
import { customAlphabet } from "nanoid";

export const handleError = (error) => {
  console.error(error)
  toast.error(error.code?.split('/')[1].replace(/-/g, ' ') || error.message)
  return error
}

export const handleApiError = (res, error) => {
  return res.status(500).json({
    code: error.code,
    message: error.message
  })
}

export const validUrl = (url) => {
  const regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i
  return regex.test(url)
}

export const friendlyUrl = (url) => {
  return url.toString()               // Convert to string
    .normalize('NFD')               // Change diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
    .replace(/\s+/g, '-')            // Change whitespace to dashes
    .toLowerCase()                  // Change to lowercase
    .replace(/&/g, '-and-')          // Replace ampersand
    .replace(/[^a-z0-9\-]/g, '')     // Remove anything that is not a letter, number or dash
    .replace(/-+/g, '-')             // Remove duplicate dashes
    .replace(/^-*/, '')              // Remove starting dashes
    .replace(/-*$/, '');             // Remove trailing dashes
}

export const nanoid = (length) => {
  return customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    length
  )()
}

export const cdn = (file) => {
  return `${process.env.NEXT_PUBLIC_CDN_URL}/${file}`
}

export const onUpload = async (file, type = 'background') => {
  try {
    const fileName = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);
    const presigned = `/api/media?fileName=${fileName}&fileType=${fileType}&type=${type}`;
    const response = await fetch(presigned, {
      method: "POST",
    });
    const { url, fields } = await response.json();
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (upload.ok) {
      toast.success("Uploaded successfully!");
      return fields.key;
    } else {
      toast.error("Upload failed.");
      return false;
    }
    return fields.key
  } catch (error) {
    handleError(error);
    return false;
  }
};