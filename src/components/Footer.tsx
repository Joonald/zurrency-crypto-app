import { Typography } from "@mui/material";

type FooterProps = { creator: string }

const Footer = ( {creator}: FooterProps ) => {
    
    return (
        <footer>
            <Typography paragraph={true} sx={{textAlign: 'center', fontSize: '1rem'}}>Designed & Built by <a href="www.jonnynguyen,com">{creator}</a></Typography>
        </footer>
    )
}
export default Footer;