import { currentProfile } from "@/lib/current-profile";

export const ProfileDrawer = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return <>Not connected</>;
  }

  const progress = 70;

  return (
    <div className="flex flex-col items-center p-2 pb-5 justify-center w-full gap-3 border-b border-[#53acff28]">
      <div className="flex flex-col items-center w-full h-full gap-3 p-3 text-primary">
        <img
          className="rounded-full w-[70px] shadow-blue border-4 border-[#53ACFF]"
          src={profile.imageUrl}
        />
        <div className="text-lg font-bold">{profile.name}</div>
        <div className="border border-[#283643] flex items-center gap-1 justify-center flex-col w-full p-2  rounded-2xl">
          <div className="text-sm">
            Level: <b className="text-[#53ACFF]">1</b>
          </div>
          <div className="w-full rounded-lg bg-white/20">
            <div
              className="h-2 rounded-lg progress-grad"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-[#384E63] text-xs text-center">
            XP: 1000/1150 XP
          </div>
        </div>
      </div>
    </div>
  );
};
