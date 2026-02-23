import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function UserProfile() {
  const firstName = localStorage.getItem("firstName") || "User";

  return (
    <div className="flex flex-col w-full pt-8 items-center">
      <Avatar className="mb-4">
        <AvatarFallback className="text-2xl font-semibold">
          {firstName.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h4>Hello, {firstName}</h4>
    </div>
  );
}
