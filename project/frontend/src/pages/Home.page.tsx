import { useNavigate } from "react-router-dom";
import useApp from "../hooks/useApp.hook";

export default function HomePage({ appLoad }: { appLoad: boolean }) {
  const { user } = useApp();
  const navigate = useNavigate();

  if (!user?.id) navigate("/auth");

  return (
    <>
      {appLoad && <div className="bg-primary h-fit" />}
      {console.log(appLoad)}
    </>
  );
}
