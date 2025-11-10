import { ModeToggle } from "./asidebar/mode-toggle";
import { useAuthContext } from "@/context/auth-provider";
import { Loader, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Header = () => {
  const { isLoading, user } = useAuthContext();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ["authUser"],
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleLogout = useCallback(() => {
    if (isPending) return;
    mutate();
  }, [isPending, mutate]);
  
  return (
    <header className="flex sticky top-0 z-50 bg-white dark:bg-zinc-900 h-12 shrink-0 items-center border-b">
      <div className="flex flex-1 gap-2 px-3 max-w-6xl mx-auto relative items-end justify-end">
        <ModeToggle />
        {isLoading ? (
          <Loader
            size="24px"
            className="place-self-center self-center animate-spin"
          />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="rounded-full">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user?.profilePicture || ""} />
                  <AvatarFallback className="rounded-full border border-gray-500">
                    {user?.name?.split(" ")?.[0]?.charAt(0)}
                    {user?.name?.split(" ")?.[1]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg"
              side={"bottom"}
              align="start"
              sideOffset={4}
            >
              <DropdownMenuLabel className="flex gap-2">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user?.profilePicture || ""} />
                  <AvatarFallback className="rounded-full border border-gray-500">
                    {user?.name?.split(" ")?.[0]?.charAt(0)}
                    {user?.name?.split(" ")?.[1]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings />
                Manage Account
              </DropdownMenuItem>
              <DropdownMenuItem disabled={isPending} onClick={handleLogout}>
                <LogOut /> 
                Log out {isPending && <Loader className="animate-spin" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
