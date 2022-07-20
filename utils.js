export const mergeStyles = (styleArray) =>
  styleArray.map((style) => `${style}`).join(" ");

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getCurrentMonth = (format) =>
  new Date().toLocaleDateString("en-US", { month: format });

export const locationTypes = () => [
  { label: "Remote", value: "REMOTE" },
  { label: "Local", value: "LOCAL" },
];

export const usersRoles = () => [
  { label: "Admin", value: "Entreprise_Admin" },
  { label: "Employee", value: "Entreprise_user" },
];

export const genders = () => [
  { label: "Women", value: "FEMALE" },
  { label: "Man", value: "MALE" },
  { label: "Other", value: "OTHER" },
];

export const submitNewRequest = (data, user, url) => {
  return new Promise(async (resolve, rej) => {
    const Authorization = user?.Authorization;
    const body = {
      ...data,
    };
    if (data?.locationType === "REMOTE") delete body["meetingInfo"];
    delete body["value"];
    await fetch(url, {
      method: "POST",
      headers: { Authorization, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => {
      // setLoading(false);
      resolve(res);
    });
  });
};

export const uploadFilesArray = async (files) => {
  const secureUrls = [];
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "aykgmsli");
    formData.append("tags", "browser upload");
    const res = await fetch(`https://api.cloudinary.com/v1_1/veezen/upload`, {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: formData,
    });
    if (res.status === 200) {
      const data = await res.json();
      secureUrls.push(data.secure_url);
    }
  }
  return secureUrls;
};

export function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 0) seconds *= -1;

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "mo";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "mi";
  }
  return Math.floor(seconds) + " seconds";
}
