export default {
  type: "object",
  name: "projectContributor",
  title: "Project Contributor",
  fields: [
    {
      title: "Role",
      name: "role",
      type: "reference",
      description: "To add a new role, go to the Roles folder and create a new entry.",
      to: { type: "role" },
      validation: Rule => Rule.required()
    },
    {
      title: "Team members",
      name: "people",
      type: "array",
      description:
        "Link one more more team members. When you link a person here, clicking their name on the website will link to their profile page.",
      of: [
        {
          type: "reference",
          description: " Add a new Person and they will be selectable here.",
          to: { type: "person" }
        }
      ]
    },
    {
      title: "Other contributors",
      name: "contributors",
      type: "string",
      description: "Type names or anything here."
    }
  ],
  preview: {
    select: {
      role: "role.title",
      contributors: "contributors",
      person0Name: "people.0.name",
      person1Name: "people.1.name",
      person2Name: "people.2.name"
    },
    prepare: ({ role, person0Name, person1Name, person2Name, contributors }) => {
      let subtitle = "";
      const people = [person0Name, person1Name].filter(Boolean);
      if (people.length) {
        const hasMorePeople = Boolean(person2Name);
        const names = people.length > 0 ? `${people.join(", ")}` : "";
        subtitle = hasMorePeople ? `${names}…` : names;
      }
      if (subtitle.length > 0 && contributors) {
        subtitle = `${subtitle}, ${contributors}`;
      } else if (contributors) {
        subtitle = contributors;
      }
      return {
        title: role,
        subtitle: subtitle
      };
    }
  }
};
