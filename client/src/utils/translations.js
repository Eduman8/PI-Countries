const continents = {
    Africa: 'África',
    Antarctica: 'Antártida',
    Asia: 'Asia',
    Europe: 'Europa',
    'North America': 'América del Norte',
    Oceania: 'Oceanía',
    'South America': 'América del Sur',
}

const seasons = {
    Summer: 'Verano',
    Autumn: 'Otoño',
    Winter: 'Invierno',
    Spring: 'Primavera',
}

export function translateContinent(continent) {
    return continents[continent] || continent
}

export function translateSeason(season) {
    return seasons[season] || season
}
