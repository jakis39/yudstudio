export default {
  name: "contactInfo",
  title: "Contact Info",
  type: "object",
  fields: [
    {
      name: "instagram",
      type: "string",
      title: "Instagram handle",
      description: "Don't include the @ symbol"
    },
    {
      name: "email",
      type: "string",
      title: "Email address"
    }
  ],
  preview: {
    select: {
      title: "instagram"
    }
  }
};
