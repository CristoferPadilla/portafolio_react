export function PortafolioLi({nameSection, asection, onClick}) {
    return (
        <li className="portafolio-li" onClick={onClick}><a href={asection}>{nameSection}</a></li>
    )
}

