import { Box, Button, Flex, Image, Link, Stack, Text } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import paths from "@/configs/paths";
import useAuth from "@/hooks/auth/useAuth";
import useHeaderStore from "@/stores/headerStore";
import Search from "@/components/community/search";
import useCommunityMain from "@/hooks/community/useCommunityMain";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { goSignupPage, goSignInPage, goLogout } = useAuth();
  const { openUserHeader, setOpenUserHeader } = useHeaderStore(
    (state) => state
  );
  const { openSearchModal, toggleSearchModal, handleChangeSearch } =
    useCommunityMain();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로컬 스토리지에 jwtToken이 있는지 확인
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // 로그아웃 시 토큰 삭제
    setIsLoggedIn(false); // 상태 업데이트
    goLogout();
  };

  const items = [
    {
      value: "a",
      title: "커뮤니티",
      text: [
        { label: "메인", path: paths.community.main },
        {
          label: "검색",
          onclick: () => {
            setOpenUserHeader();
          },
        },
        { label: "내 피드", path: paths.community.myCommunity },
      ],
    },
    {
      value: "b",
      title: "디바이더",
      text: [
        { label: "음원 업로드", path: paths.divider.upload },
        { label: "워크스페이스", path: paths.workspace.list },
      ],
    },
    {
      value: "c",
      title: "미니 게임",
      text: [
        { label: "게임 홈", path: paths.game.home },
        // { label: "절대음감", path: paths.game.keyboards },
        // { label: "리듬킹", path: paths.game.drum },
        // { label: "퍼펙트 싱어", path: paths.game.vocal },
      ],
    },
    {
      value: "d",
      title: "세팅",
      text: [{ label: "마이페이지", path: paths.setting.mypage }],
    },
  ];

  return (
    <Flex>
      <Stack padding="0" fontFamily="MiceGothicBold" flex="1">
        <Box width="100%" margin="0" paddingY="4">
          <Link href={paths.main}>
            <Image src="/common/Logo.png" alt="Logo.png" />
          </Link>
        </Box>
        <Stack>
          <Flex gap="2">
            {isLoggedIn ? (
              <Box display="flex" flexDirection="column" gap="5px">
                <Button
                  border="solid 2px #9000FF"
                  borderRadius="15px"
                  height="30px"
                  width="80px"
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
                <Box display="flex" flexDirection="row" gap="5px">
                  <Button
                    border="solid 2px #9000FF"
                    borderRadius="15px"
                    height="30px"
                    width="80px"
                  >
                    팔로우
                  </Button>
                  <Button
                    border="solid 2px #9000FF"
                    borderRadius="15px"
                    height="30px"
                    width="80px"
                  >
                    팔로잉
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Button
                  border="solid 2px #9000FF"
                  borderRadius="15px"
                  height="30px"
                  width="80px"
                  onClick={goSignInPage}
                >
                  로그인
                </Button>
                <Button
                  border="solid 2px #9000FF"
                  borderRadius="15px"
                  height="30px"
                  width="80px"
                  onClick={goSignupPage}
                >
                  회원가입
                </Button>
              </>
            )}
          </Flex>
        </Stack>
        <AccordionRoot collapsible defaultValue={["b"]}>
          {items.map((item, index) => (
            <AccordionItem key={index} value={item.value} paddingY="1">
              <AccordionItemTrigger color="white">
                <Text fontSize="lg">{item.title}</Text>
              </AccordionItemTrigger>
              <AccordionItemContent color="white">
                {item.text.map((linkItem, i) => (
                  <Link
                    key={i}
                    href={linkItem.path}
                    color="white"
                    display="block"
                    paddingY="1"
                    onClick={linkItem.onclick}
                  >
                    <Text fontSize="sm">{linkItem.label}</Text>
                  </Link>
                ))}
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </Stack>
      {openUserHeader && (
        <Search
          isOpen={openUserHeader}
          onClose={() => {
            setOpenUserHeader();
          }}
        />
      )}
    </Flex>
  );
}
