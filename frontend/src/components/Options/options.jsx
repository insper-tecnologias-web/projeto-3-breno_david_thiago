import {
    LogOut,
    User,
    Star,
  } from "lucide-react"

  import { Link } from 'react-router-dom';
  import { AvatarDemo } from "./avatar";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  export function Options(props) {

    let logado = false
    const isLogged = localStorage.getItem('logged');
    if (isLogged !== null) {
      logado = (isLogged === 'true'); 
    } else {
      localStorage.setItem('logged', false.toString());
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="mr-4 rounded-full focus:outline-none">
            <AvatarDemo tamanho = "h-16 w-16"></AvatarDemo>
          </button>
        </DropdownMenuTrigger>
          {logado ? (<DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to = {'/profile/'}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            </Link>
            <Link to = {'/watchlist/'}>
            <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                <span>Watchlist</span>
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span onClick={() => props.logOut()}>Log out</span>
            <DropdownMenuShortcut onClick={() => props.logOut()}>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>) 
                                : (<DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <LogOut className="mr-2 h-4 w-4" />
                                      <span onClick={() => props.logIn()}>Log In</span>
                                      <DropdownMenuShortcut onClick={() => props.logIn()}>⇧⌘Q</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>)}
      </DropdownMenu>
    )
  }
  