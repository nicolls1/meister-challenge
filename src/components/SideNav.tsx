import React from "react";
import { Box, Center, Flex, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
const sideBarOpenKey = "sb";
const expandedQueryParamValue = "t";
const shrunkQueryParamValue = "f";

const getLocalStorageExpanded = () => {
  const storedValue = localStorage.getItem(sideBarOpenKey);
  // Only the stored value of "false" should resolve to the boolean false,
  // all other values resolve to true.
  return storedValue ? !(storedValue === "false") : true;
};

type SideNavProps = {
  navOptions: {
    icon: React.ElementType;
    label: string;
    origin: string;
    pathname: string;
  }[];
};

const expandedWidth = 200;
const shrunkWidth = 56;

export const SideNav: React.FC<SideNavProps> = ({ navOptions }) => {
  const search = new URLSearchParams(window.location.search);
  const [expanded, setExpanded] = React.useState(
    !!search.get(sideBarOpenKey)
      ? search.get(sideBarOpenKey) !== shrunkQueryParamValue
      : getLocalStorageExpanded()
  );

  // Sidebar state has been set and now can be cleared.
  React.useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    if (search.get(sideBarOpenKey)) {
      // Delete the `sideBarOpenKey` while preserving all other search state
      search.delete(sideBarOpenKey);
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname +
          (!!search.toString() ? `?${search.toString()}` : "")
      );
    }
  }, []);

  // Report expanded state to local storage for cross session consistency
  React.useEffect(() => {
    localStorage.setItem(sideBarOpenKey, expanded.toString());
  }, [expanded]);

  return (
    <>
      {/* Placeholder element in the document flow */}
      <Box
        transition="width .5s ease"
        w={expanded ? `${expandedWidth}px` : `${shrunkWidth}px`}
      />
      <Flex
        direction="column"
        bgColor="blue.500"
        py="2"
        position="fixed"
        transition="width .5s ease"
        w={expanded ? `${expandedWidth}px` : `${shrunkWidth}px`}
        data-testid="side-nav-root"
        top="0"
        bottom="0"
      >
        {navOptions.map((option) => {
          const isActive =
            window.location.origin === option.origin &&
            window.location.pathname === option.pathname;
          return (
            <Box
              // Assume the full url is unique
              key={`${option.origin}${option.pathname}`}
              as={!isActive ? Link : undefined}
              _hover={{ textDecoration: "none", bgColor: "blue.600" }}
              px="4"
              py="2"
              borderRadius="full"
              overflow="hidden"
              href={
                // If it is the same origin, local storage will be able to save the state.
                // When it is not the same, we need to pass the state as a query param.
                option.origin === window.location.origin
                  ? option.pathname
                  : `${option.origin}${option.pathname}?${sideBarOpenKey}=${
                      expanded ? expandedQueryParamValue : shrunkQueryParamValue
                    }`
              }
              bgColor={isActive ? "blue.600" : undefined}
            >
              <Stack
                direction="row"
                spacing="4"
                alignItems="center"
                color="white"
              >
                <Icon as={option.icon} boxSize={6} />
                <Text>{option.label}</Text>
              </Stack>
            </Box>
          );
        })}
        <Center
          position="fixed"
          bottom="4"
          left={`${(expanded ? expandedWidth : shrunkWidth) - 16}px`}
          bgColor="blue.500"
          borderRadius="full"
          w="8"
          h="8"
          transition="left .5s ease"
        >
          <ChevronLeftIcon
            onClick={() => setExpanded(!expanded)}
            boxSize={6}
            color="white"
            transform={`rotateY(${expanded ? "0deg" : "180deg"})`}
            transition="transform .5s ease"
            data-testid="side-nav-toggle"
          />
        </Center>
      </Flex>
    </>
  );
};
