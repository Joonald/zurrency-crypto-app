type FooterProps = { creator: string }

const Footer = ( {creator}: FooterProps ) => {
    
    return (
        <footer>
            <article>Designed & Built by <a href="www.jonnynguyen,com">{creator}</a></article>
        </footer>
    )
}
export default Footer;