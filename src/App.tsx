import { Flex, Heading, Stack } from "@chakra-ui/react";
import { SideNav } from "./components/SideNav";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { PiNotePencilFill } from "react-icons/pi";
import { ProjectList } from "./components/ProjectList";
import { NoteList } from "./components/NoteList";

const navOptions = [
  {
    icon: AiOutlineFundProjectionScreen,
    label: "Projects",
    origin: "http://localhost:5174", //"https://ProjectApp.com",
    pathname: "/",
  },
  {
    icon: PiNotePencilFill,
    label: "Notes",
    origin: "http://localhost:4321", //"https://ProjectNote.com",
    pathname: "/",
  },
];

const hrefToComponent = {
  "http://localhost:5174/": {
    title: "Projects",
    component: ProjectList,
  },
  "http://localhost:4321/": {
    title: "Notes",
    component: NoteList,
  },
};

function App() {
  const locationData =
    hrefToComponent[
      (window.location.origin +
        window.location.pathname) as keyof typeof hrefToComponent
    ];
  return (
    <Flex direction="row" minH="100vh" minW="100vw">
      <SideNav navOptions={navOptions} />
      <Stack direction="column" spacing="4" m="4" flexGrow={1}>
        <Heading>{locationData.title}</Heading>
        <locationData.component />
      </Stack>
    </Flex>
  );
}

export default App;
