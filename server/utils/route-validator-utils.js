export function segmentExists(
    stationA,
    stationB,
    segments
) {

    return segments.some(segment =>

        (
            segment.stationA === stationA &&
            segment.stationB === stationB
        )

        ||

        (
            segment.stationA === stationB &&
            segment.stationB === stationA
        )

    );

}

export function hasRepeatedSegment(
    route
) {

    const usedSegments =
        new Set();

    for (
        let i = 0;
        i < route.length - 1;
        i++
    ) {

        const a = route[i];
        const b = route[i + 1];

        const key =
            a < b
                ? `${a}-${b}`
                : `${b}-${a}`;

        if (
            usedSegments.has(key)
        ) {
            return true;
        }

        usedSegments.add(key);

    }

    return false;
}

function buildSegmentLineMap(
    segments
) {

    const map = {};

    for (const segment of segments) {

        const key =
            [
                segment.stationA,
                segment.stationB
            ]
                .sort((a, b) => a - b)
                .join('-');

        map[key] =
            segment.lineId;

    }

    return map;
}

function buildStationLineMap(
    stationLines
) {

    const map = {};

    for (
        const stationLine
        of stationLines
    ) {

        const stationId =
            stationLine.stationId;

        if (!map[stationId])
            map[stationId] = [];

        map[stationId].push(
            stationLine.lineId
        );

    }

    return map;
}

function validLineChanges(
    route,
    segments,
    stationLines
) {

    const segmentLineMap =
        buildSegmentLineMap(
            segments
        );

    const stationLineMap =
        buildStationLineMap(
            stationLines
        );

    for (
        let i = 0;
        i < route.length - 2;
        i++
    ) {

        const stationA =
            route[i];

        const stationB =
            route[i + 1];

        const stationC =
            route[i + 2];

        const key1 =
            [stationA, stationB]
                .sort((a, b) => a - b)
                .join('-');

        const key2 =
            [stationB, stationC]
                .sort((a, b) => a - b)
                .join('-');

        const line1 =
            segmentLineMap[key1];

        const line2 =
            segmentLineMap[key2];

        if (
            line1 !== line2
        ) {

            const linesAtStation =
                stationLineMap[
                    stationB
                ] || [];

            if (
                linesAtStation.length < 2
            ) {
                return false;
            }

        }

    }

    return true;
}

export function validateRoute(
    route,
    startStation,
    destinationStation,
    segments,
    stationLines
) {

    if (
        route.length === 0
    ) {
        return false;
    }

    if (
        route[0] !== startStation
    ) {
        return false;
    }

    if (
        route[
            route.length - 1
        ] !== destinationStation
    ) {
        return false;
    }

    for (
        let i = 0;
        i < route.length - 1;
        i++
    ) {

        const current =
            route[i];

        const next =
            route[i + 1];

        if (
            !segmentExists(
                current,
                next,
                segments
            )
        ) {
            return false;
        }

    }

    if (
        hasRepeatedSegment(route)
    ) {
        return false;
    }

    if (
        !validLineChanges(
            route,
            segments,
            stationLines
        )
    ) {
        return false;
    }

    return true;
}