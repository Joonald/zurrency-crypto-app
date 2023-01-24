type FooterProps = { creator: string }

const Footer = ( {creator}: FooterProps ) => {
    
    return (
        <footer>
            <article>Designed & Built by {creator}</article>
        </footer>
    )
}
export default Footer;