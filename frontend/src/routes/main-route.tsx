import type { RouteObject } from "react-router-dom";
import paths from "../configs/paths";
import DividerUploadView from "../pages/divider/upload-view";
import SignInView from "../pages/auth/signin-view";
import SignUpView from "../pages/auth/signup-view";

const mainRoute: RouteObject[] = [
  {
    path: paths.auth.signIn,
    element: <SignInView />, // 로그인 페이지
  },
  {
    path: paths.auth.signUp,
    element: <SignUpView />, // 회원가입 페이지
  },
  {
    path: paths.root,
    // 메인 경로로 설정할 페이지는 나중에 element를 지정할 수 있음
    children: [
      {
        // path: paths.community,
        // element: <CommunityView />, // 나중에 추가 가능
      },
      {
        path: paths.divider.upload,
        element: <DividerUploadView />,
      },
      {
        // path: paths.workspace,
        // element: <WorkspaceView />, // 나중에 추가 가능
      },
      {
        // path: paths.game,
        // element: <GameView />, // 나중에 추가 가능
      },
    ],
  },
];

export default mainRoute;
