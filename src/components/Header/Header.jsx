import { GoBackButton } from "./GoBackButton/GoBackButton";
import { CartIcon } from "./CartIcon/CartIcon";

export const Header = () => {

    return (
        <header className="App-header">
            <GoBackButton/>
            <CartIcon/>
        </header>
    )

}