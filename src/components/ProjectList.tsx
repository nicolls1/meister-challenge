import { Avatar, SimpleGrid, Stack, Text } from "@chakra-ui/react";

type Member = {
  userId: string;
  name: string;
};

type Project = {
  id: string;
  createDate: string;
  title: string;
  description: string;
  members: Member[];
};

const useProjects = () => ({
  data: [
    {
      id: "1",
      createDate: "2024-10-02T15:48:48.407Z",
      title: "Feature one",
      description: "Our users are requesting feature one",
      members: [
        {
          userId: "1",
          name: "John Doe",
        },
        {
          userId: "2",
          name: "Alice Smith",
        },
      ],
    },
    {
      id: "2",
      createDate: "2024-10-02T13:48:48.407Z",
      title: "Feature two",
      description: "Our users are requesting feature two",
      members: [
        {
          userId: "2",
          name: "Alice Smith",
        },
        {
          userId: "3",
          name: "Joe Douglas",
        },
      ],
    },
    {
      id: "3",
      createDate: "2024-10-02T13:48:48.407Z",
      title: "Feature three",
      description: "Our users are requesting feature three",
      members: [
        {
          userId: "2",
          name: "Alice Smith",
        },
        {
          userId: "3",
          name: "Joe Douglas",
        },
      ],
    },
    {
      id: "4",
      createDate: "2024-10-02T13:48:48.407Z",
      title: "Feature four",
      description: "Our users are requesting feature four",
      members: [
        {
          userId: "2",
          name: "Alice Smith",
        },
        {
          userId: "3",
          name: "Joe Douglas",
        },
      ],
    },
    {
      id: "5",
      createDate: "2024-10-02T13:48:48.407Z",
      title: "Feature five",
      description: "Our users are requesting feature five",
      members: [
        {
          userId: "1",
          name: "John Doe",
        },
        {
          userId: "2",
          name: "Alice Smith",
        },
        {
          userId: "3",
          name: "Joe Douglas",
        },
      ],
    },
  ] as Project[],
});

export const ProjectList: React.FC = () => {
  const projects = useProjects();
  return (
    <SimpleGrid minChildWidth="450px" spacing={4}>
      {projects.data.map((project) => (
        <Stack
          direction="column"
          key={project.id}
          border="1px"
          borderColor="gray.200"
          shadow="lg"
          p={4}
          borderRadius={4}
        >
          <Text>{project.title}</Text>
          <Text size="sm">{project.description}</Text>
          <Stack direction="row" overflow="hidden" spacing="2">
            {project.members.map((member) => (
              <Avatar key={member.userId} name={member.name} />
            ))}
          </Stack>
        </Stack>
      ))}
    </SimpleGrid>
  );
};
