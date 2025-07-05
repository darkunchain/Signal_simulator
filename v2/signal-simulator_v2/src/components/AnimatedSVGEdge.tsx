import React, { useEffect, useState } from "react";
import { BaseEdge, EdgeProps, getSmoothStepPath, getBezierPath } from 'reactflow';


export function KeyEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data
}: EdgeProps) {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const dur = data?.dur || "2s";
    const repeatCount = data?.repeatCount || "indefinite";
    const scaleEdge = data?.scale || 1;
    const fill = data?.fill || "#ffca28";
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (repeatCount !== "indefinite") {
        // Oculta después de (dur * repeatCount) segundos
        const total = dur * repeatCount * 1000;
        const timeout = setTimeout(() => setVisible(false), total);
        return () => clearTimeout(timeout);
        }
    }, [dur, repeatCount]);


    return (
        <>
             {/* Dibuja la línea base */}
            <BaseEdge id={id} path={edgePath} />
            {/* SVG overlay para animar el sobre */}
            <svg style={{ overflow: "visible", pointerEvents: "none", position: "absolute" }} width="12" height="12">
                <g transform={`scale(${scaleEdge})`}>
                <animateMotion dur={dur} repeatCount={repeatCount} path={edgePath} />
                {/* El ícono del sobre como <g> */}
                <g
                    id="layer1"
                    transform="translate(-138.52928,-109.84163)">
                        <path
                        style={{fill:"#9e740b",fillOpacity:1,stroke:"#9e740b",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                        d="m 186.52494,115.30652 c 11.78229,11.01261 5.64836,23.67644 0.93977,27.69419 -5.31529,4.3749 -11.55167,5.23287 -18.70916,2.57392 -3.55282,4.63105 -5.49154,4.56838 -6.63155,4.55414 -2.80705,-0.0324 -3.53204,2.01256 -3.42272,3.48553 0.18491,2.56344 -1.07463,3.79757 -3.68442,3.09006 -1.47256,-0.31973 -2.53691,0.73172 -2.29811,2.35362 0.30898,2.11581 -3.40661,6.60241 -5.44748,6.67715 -4.40266,0.15512 -5.6815,-1.22966 -7.20902,-2.49186 l 26.80332,-23.38267 16.39138,-13.12567 z"
                        id="path3"
                        />
                        <path
                        id="path1"
                        style={{fill: fill,fillOpacity:1,stroke:"#9e740b",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                        d="m 174.70045,109.86513 c -18.89773,0.34326 -20.90347,19.22504 -17.14108,24.95713 L 139.885,152.31887 c -0.76974,0.71053 -1.2138,1.59864 -1.33222,2.66443 0,1.92434 0.0885,3.84896 0.26614,5.7733 0.47368,0.38487 0.88807,1.21364 1.24333,2.48667 2.32552,0.33525 4.65913,0.87825 6.92774,-0.26614 l 2.22054,-2.22053 c 0.86595,-0.74013 1.19926,-1.74694 0.99942,-3.01997 -0.35526,-1.7171 0.86584,-3.04931 2.55334,-2.66444 1.85026,0.73206 3.67684,-0.66248 3.5636,-3.05821 -0.21837,-2.39479 1.25368,-3.96542 3.27525,-3.86902 2.49613,-0.19462 4.28028,-1.77109 6.48333,-4.35219 9.6134,4.92034 22.9531,-0.71005 25.1349,-13.49995 1.4356,-12.48869 -8.14546,-20.33859 -16.51992,-20.42769 z m 1.81797,10.19214 a 4.7701588,4.8618922 0 0 1 4.77026,4.86224 4.7701588,4.8618922 0 0 1 -4.77026,4.86172 4.7701588,4.8618922 0 0 1 -4.77025,-4.86172 4.7701588,4.8618922 0 0 1 4.77025,-4.86224 z"
                        />
                        <path
                        style={{fill:"#9e740b",fillOpacity:1,stroke:"#9e740b",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                        d="m 174.47918,129.31461 c -1.76574,-4.23813 2.05801,-8.03969 6.46225,-6.21651 -1.31785,-3.15234 -5.14685,-4.11596 -7.76061,-1.65262 -2.30275,2.43295 -1.79009,6.31063 1.29836,7.86913 z"
                        id="path2"
                        />
                        <path
                        style={{fill:"#dba010",fillOpacity:1,stroke:"#dba010",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                        d="m 140.06225,163.24327 21.98216,-22.55906 c -0.77676,-0.41879 -2.38019,-0.61365 -4.08553,1.1102 l -19.13996,18.96219 c 0.45418,0.34617 0.86862,1.17506 1.24333,2.48667 z"
                        id="path4"
                        />
                        <path
                        style={{fill:"#fff59d",fillOpacity:1,stroke:"#fff59d",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                        d="m 151.0708,145.3872 c 1.16283,-0.23944 4.63927,-4.44508 6.97105,-6.68844 0.39549,-0.5232 0.33792,-1.4286 0.0628,-2.00967 -0.13279,-0.23684 -0.384,-0.23684 -0.75363,0 -6.0206,5.97758 -6.8851,7.63301 -6.28022,8.69811 z"
                        id="path5"
                        />
                        <path
                        style={{fill:"#fff59d",fillOpacity:1,stroke:"#fff59d",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                        d="m 160.80515,132.95236 c -2.47642,-4.93439 -1.37076,-11.55675 3.39132,-15.57496 1.62239,-0.90016 3.10871,0.13607 1.82127,1.60146 -3.27618,3.61113 -4.45896,7.80841 -2.98311,12.59185 0.64896,2.29228 -1.00484,3.03544 -2.22948,1.38165 z"
                        id="path6"
                        />
                        </g>
                </g>
            </svg>
        </>
    );
}




export function MessageEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data
}: EdgeProps) {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const dur = data?.dur || "2s";
    const repeatCount = data?.repeatCount || "indefinite";
    const scaleEdge = data?.scale || 1;
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (repeatCount !== "indefinite") {
        // Oculta después de (dur * repeatCount) segundos
        const total = dur * repeatCount * 1000;
        const timeout = setTimeout(() => setVisible(false), total);
        return () => clearTimeout(timeout);
        }
    }, [dur, repeatCount]);

    return (
        <>
            {/* Dibuja la línea base */}
            <BaseEdge id={id} path={edgePath} />
            {/* SVG overlay para animar el sobre */}
            <svg style={{ overflow: "visible", pointerEvents: "none", position: "absolute" }} width="12" height="12">
                <g transform={`scale(${scaleEdge})`}>
                <animateMotion dur={dur} repeatCount={repeatCount} path={edgePath} />
                {/* El ícono del sobre como <g> */}
                <g
                    id="layer1"
                    transform="translate(-110.41045,-43.051437)">
                    <path
                    style={{fill:"#fdfdfd",fillOpacity:1,stroke:"#000000",strokeWidth:0.215332,strokeLinecap:"butt",strokeLinejoin:"miter",strokeOpacity:1,}}
                    d="M 110.60486,55.429656 115.8805,76.316877 138.81338,65.7656 137.09072,51.984341 128.15443,62.427952 Z"
                    />
                    <path
                    style={{fill:"#d2ddf7",fillOpacity:1,stroke:"#000000",strokeWidth:0.215332,strokeLinecap:"butt",strokeLinejoin:"miter",strokeOpacity:1}}
                    d="m 110.60486,55.429658 11.8971,-11.520274 c 1.35462,-1.14272 2.48313,-0.815816 3.55299,-0.107665 l 11.03577,8.182622 -8.93629,10.443613 z"
                    />
                    <path
                    d="m 116.5752,75.726858 -0.94839,-1.464693 10.4205,-13.408646 c 0.81086,-1.024627 1.7235,-1.835147 3.55914,-0.704216 l 8.83125,4.986608 0.0592,0.686787 z"
                    style={{display:"inline",fill:"none",stroke:"#000000",strokeWidth:0.622598,strokeLinecap:"butt",strokeLinejoin:"miter",strokeMiterlimit:4,strokeDasharray:"none",strokeOpacity:1}}
                    />
                    <path
                    style={{fill:"#d2ddf7",fillOpacity:1,stroke:"#000000",strokeWidth:0.215332,strokeLinecap:"butt",strokeLinejoin:"miter",strokeOpacity:1}}
                    d="m 115.8805,76.316879 -0.36546,-1.226784 10.84873,-14.293674 c 0.81086,-1.024628 1.72351,-1.835147 3.55914,-0.704216 l 8.83125,4.986608 0.0592,0.686787 z"
                    />
                    <path
                    style={{fill:"#15578b",fillOpacity:1,stroke:"none",strokeWidth:0.0406927,strokeLinecap:"butt",strokeLinejoin:"miter",strokeMiterlimit:4,strokeDasharray:"none",strokeOpacity:1}}
                    d="m 126.5998,50.441988 v -1.06584 h 1.14198 l -0.26646,4.948542 c 0.16148,0.578166 0.68496,1.319226 1.82716,-0.304525 1.24617,-5.429005 -1.98709,-7.184824 -4.87241,-7.194421 -3.65487,0.302505 -6.99125,5.501172 -1.9033,10.277743 3.37677,2.468328 6.00009,0.528419 7.27056,-0.989707 0.28422,-0.1218 0.47973,-0.14223 0.26646,0.304524 -2.11494,2.442497 -5.97778,3.340514 -8.75511,0.989708 -5.58534,-5.444038 -0.66978,-11.160533 2.81687,-11.229383 6.81746,-0.01883 6.30873,6.84824 5.55759,8.06993 -1.32747,1.994252 -2.80304,1.177499 -3.19753,0.07613 -1.07517,2.861423 -3.55923,1.340672 -3.92077,-0.07613 -0.6924,-2.531166 0.48276,-4.141392 1.78909,-4.758215 1.09005,-0.465148 1.88259,0.06541 2.21971,0.954024 l -0.4901,0.08564 c -0.93089,-1.482839 -1.53705,-0.340501 -1.69741,0.162335 -0.42708,0.953532 -0.63004,3.305175 -0.10768,4.239353 0.76934,0.910553 1.151,0.27045 1.57462,-0.201874 0.84013,-2.016896 0.59333,-3.085176 0.23722,-4.195614 z"
                    />
                    </g>
                </g>
            </svg>
        </>
    );
}





export function Key3Edge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data
}: EdgeProps) {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const dur = data?.dur || "2s";
    const repeatCount = data?.repeatCount || "indefinite";
    const scaleEdge = data?.scale || 1;
    const fill = data?.fill || "#ffca28";
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (repeatCount !== "indefinite") {
        // Oculta después de (dur * repeatCount) segundos
        const total = dur * repeatCount * 1000;
        const timeout = setTimeout(() => setVisible(false), total);
        return () => clearTimeout(timeout);
        }
    }, [dur, repeatCount]);

    return (
        <>
            {/* Dibuja la línea base */}
            <BaseEdge id={id} path={edgePath} />
            {/* SVG overlay para animar el sobre */}
            <svg style={{ overflow: "visible", pointerEvents: "none", position: "absolute" }} width="12" height="12">
                <g transform={`scale(${scaleEdge})`}>
                <animateMotion dur={dur} repeatCount={repeatCount} path={edgePath} />
                {/* El ícono del sobre como <g> */}
                    <g id="layer1" transform="translate(-138.52928,-109.84163)">
                        <g d="g6">
                            <path
                            style={{fill:"#9e740b",fillOpacity:1,stroke:"#9e740b",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 186.52494,115.30652 c 11.78229,11.01261 5.64836,23.67644 0.93977,27.69419 -5.31529,4.3749 -11.55167,5.23287 -18.70916,2.57392 -3.55282,4.63105 -5.49154,4.56838 -6.63155,4.55414 -2.80705,-0.0324 -3.53204,2.01256 -3.42272,3.48553 0.18491,2.56344 -1.07463,3.79757 -3.68442,3.09006 -1.47256,-0.31973 -2.53691,0.73172 -2.29811,2.35362 0.30898,2.11581 -3.40661,6.60241 -5.44748,6.67715 -4.40266,0.15512 -5.6815,-1.22966 -7.20902,-2.49186 l 26.80332,-23.38267 16.39138,-13.12567 z"
                            />
                            <path
                            style={{fill: fill,fillOpacity:1,stroke:"#9e740b",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 174.70045,109.86513 c -18.89773,0.34326 -20.90347,19.22504 -17.14108,24.95713 L 139.885,152.31887 c -0.76974,0.71053 -1.2138,1.59864 -1.33222,2.66443 0,1.92434 0.0885,3.84896 0.26614,5.7733 0.47368,0.38487 0.88807,1.21364 1.24333,2.48667 2.32552,0.33525 4.65913,0.87825 6.92774,-0.26614 l 2.22054,-2.22053 c 0.86595,-0.74013 1.19926,-1.74694 0.99942,-3.01997 -0.35526,-1.7171 0.86584,-3.04931 2.55334,-2.66444 1.85026,0.73206 3.67684,-0.66248 3.5636,-3.05821 -0.21837,-2.39479 1.25368,-3.96542 3.27525,-3.86902 2.49613,-0.19462 4.28028,-1.77109 6.48333,-4.35219 9.6134,4.92034 22.9531,-0.71005 25.1349,-13.49995 1.4356,-12.48869 -8.14546,-20.33859 -16.51992,-20.42769 z m 1.81797,10.19214 a 4.7701588,4.8618922 0 0 1 4.77026,4.86224 4.7701588,4.8618922 0 0 1 -4.77026,4.86172 4.7701588,4.8618922 0 0 1 -4.77025,-4.86172 4.7701588,4.8618922 0 0 1 4.77025,-4.86224 z"
                            />
                            <path
                            style={{fill:"#9e740b",fillOpacity:1,stroke:"#9e740b",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 174.47918,129.31461 c -1.76574,-4.23813 2.05801,-8.03969 6.46225,-6.21651 -1.31785,-3.15234 -5.14685,-4.11596 -7.76061,-1.65262 -2.30275,2.43295 -1.79009,6.31063 1.29836,7.86913 z"
                            />
                            <path
                            style={{fill:"#dba010",fillOpacity:1,stroke:"#dba010",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 140.06225,163.24327 21.98216,-22.55906 c -0.77676,-0.41879 -2.38019,-0.61365 -4.08553,1.1102 l -19.13996,18.96219 c 0.45418,0.34617 0.86862,1.17506 1.24333,2.48667 z"
                            />
                            <path
                            style={{fill:"#fff59d",fillOpacity:1,stroke:"#fff59d",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 151.0708,145.3872 c 1.16283,-0.23944 4.63927,-4.44508 6.97105,-6.68844 0.39549,-0.5232 0.33792,-1.4286 0.0628,-2.00967 -0.13279,-0.23684 -0.384,-0.23684 -0.75363,0 -6.0206,5.97758 -6.8851,7.63301 -6.28022,8.69811 z"
                            />
                            <path
                            style={{fill:"#fff59d",fillOpacity:1,stroke:"#fff59d",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 160.80515,132.95236 c -2.47642,-4.93439 -1.37076,-11.55675 3.39132,-15.57496 1.62239,-0.90016 3.10871,0.13607 1.82127,1.60146 -3.27618,3.61113 -4.45896,7.80841 -2.98311,12.59185 0.64896,2.29228 -1.00484,3.03544 -2.22948,1.38165 z"
                            />
                        </g>
                        <g id="g6-7" transform="translate(10.86479,15.920365)">
                            <path
                            style={{fill:"#9e740b",fillOpacity:1,stroke:"#9e740b",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 186.52494,115.30652 c 11.78229,11.01261 5.64836,23.67644 0.93977,27.69419 -5.31529,4.3749 -11.55167,5.23287 -18.70916,2.57392 -3.55282,4.63105 -5.49154,4.56838 -6.63155,4.55414 -2.80705,-0.0324 -3.53204,2.01256 -3.42272,3.48553 0.18491,2.56344 -1.07463,3.79757 -3.68442,3.09006 -1.47256,-0.31973 -2.53691,0.73172 -2.29811,2.35362 0.30898,2.11581 -3.40661,6.60241 -5.44748,6.67715 -4.40266,0.15512 -5.6815,-1.22966 -7.20902,-2.49186 l 26.80332,-23.38267 16.39138,-13.12567 z"
                            />
                            <path
                            style={{fill: fill,fillOpacity:1,stroke:"#9e740b",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 174.70045,109.86513 c -18.89773,0.34326 -20.90347,19.22504 -17.14108,24.95713 L 139.885,152.31887 c -0.76974,0.71053 -1.2138,1.59864 -1.33222,2.66443 0,1.92434 0.0885,3.84896 0.26614,5.7733 0.47368,0.38487 0.88807,1.21364 1.24333,2.48667 2.32552,0.33525 4.65913,0.87825 6.92774,-0.26614 l 2.22054,-2.22053 c 0.86595,-0.74013 1.19926,-1.74694 0.99942,-3.01997 -0.35526,-1.7171 0.86584,-3.04931 2.55334,-2.66444 1.85026,0.73206 3.67684,-0.66248 3.5636,-3.05821 -0.21837,-2.39479 1.25368,-3.96542 3.27525,-3.86902 2.49613,-0.19462 4.28028,-1.77109 6.48333,-4.35219 9.6134,4.92034 22.9531,-0.71005 25.1349,-13.49995 1.4356,-12.48869 -8.14546,-20.33859 -16.51992,-20.42769 z m 1.81797,10.19214 a 4.7701588,4.8618922 0 0 1 4.77026,4.86224 4.7701588,4.8618922 0 0 1 -4.77026,4.86172 4.7701588,4.8618922 0 0 1 -4.77025,-4.86172 4.7701588,4.8618922 0 0 1 4.77025,-4.86224 z"
                            />
                            <path
                            style={{fill:"#9e740b",fillOpacity:1,stroke:"#9e740b",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 174.47918,129.31461 c -1.76574,-4.23813 2.05801,-8.03969 6.46225,-6.21651 -1.31785,-3.15234 -5.14685,-4.11596 -7.76061,-1.65262 -2.30275,2.43295 -1.79009,6.31063 1.29836,7.86913 z"
                            />
                            <path
                            style={{fill:"#dba010",fillOpacity:1,stroke:"#dba010",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 140.06225,163.24327 21.98216,-22.55906 c -0.77676,-0.41879 -2.38019,-0.61365 -4.08553,1.1102 l -19.13996,18.96219 c 0.45418,0.34617 0.86862,1.17506 1.24333,2.48667 z"
                            />
                            <path
                            style={{fill:"#fff59d",fillOpacity:1,stroke:"#fff59d",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 151.0708,145.3872 c 1.16283,-0.23944 4.63927,-4.44508 6.97105,-6.68844 0.39549,-0.5232 0.33792,-1.4286 0.0628,-2.00967 -0.13279,-0.23684 -0.384,-0.23684 -0.75363,0 -6.0206,5.97758 -6.8851,7.63301 -6.28022,8.69811 z"
                            />
                            <path
                            style={{fill:"#fff59d",fillOpacity:1,stroke:"#fff59d",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 160.80515,132.95236 c -2.47642,-4.93439 -1.37076,-11.55675 3.39132,-15.57496 1.62239,-0.90016 3.10871,0.13607 1.82127,1.60146 -3.27618,3.61113 -4.45896,7.80841 -2.98311,12.59185 0.64896,2.29228 -1.00484,3.03544 -2.22948,1.38165 z"
                            />
                        </g>
                        <g id="g6-8" transform="translate(21.72958,31.84073)">
                            <path
                            style={{fill:"#9e740b",fillOpacity:1,stroke:"#9e740b",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 186.52494,115.30652 c 11.78229,11.01261 5.64836,23.67644 0.93977,27.69419 -5.31529,4.3749 -11.55167,5.23287 -18.70916,2.57392 -3.55282,4.63105 -5.49154,4.56838 -6.63155,4.55414 -2.80705,-0.0324 -3.53204,2.01256 -3.42272,3.48553 0.18491,2.56344 -1.07463,3.79757 -3.68442,3.09006 -1.47256,-0.31973 -2.53691,0.73172 -2.29811,2.35362 0.30898,2.11581 -3.40661,6.60241 -5.44748,6.67715 -4.40266,0.15512 -5.6815,-1.22966 -7.20902,-2.49186 l 26.80332,-23.38267 16.39138,-13.12567 z"
                            />
                            <path
                            style={{fill: fill,fillOpacity:1,stroke:"#9e740b",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 174.70045,109.86513 c -18.89773,0.34326 -20.90347,19.22504 -17.14108,24.95713 L 139.885,152.31887 c -0.76974,0.71053 -1.2138,1.59864 -1.33222,2.66443 0,1.92434 0.0885,3.84896 0.26614,5.7733 0.47368,0.38487 0.88807,1.21364 1.24333,2.48667 2.32552,0.33525 4.65913,0.87825 6.92774,-0.26614 l 2.22054,-2.22053 c 0.86595,-0.74013 1.19926,-1.74694 0.99942,-3.01997 -0.35526,-1.7171 0.86584,-3.04931 2.55334,-2.66444 1.85026,0.73206 3.67684,-0.66248 3.5636,-3.05821 -0.21837,-2.39479 1.25368,-3.96542 3.27525,-3.86902 2.49613,-0.19462 4.28028,-1.77109 6.48333,-4.35219 9.6134,4.92034 22.9531,-0.71005 25.1349,-13.49995 1.4356,-12.48869 -8.14546,-20.33859 -16.51992,-20.42769 z m 1.81797,10.19214 a 4.7701588,4.8618922 0 0 1 4.77026,4.86224 4.7701588,4.8618922 0 0 1 -4.77026,4.86172 4.7701588,4.8618922 0 0 1 -4.77025,-4.86172 4.7701588,4.8618922 0 0 1 4.77025,-4.86224 z"
                            />
                            <path
                            style={{fill:"#9e740b",fillOpacity:1,stroke:"#9e740b",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 174.47918,129.31461 c -1.76574,-4.23813 2.05801,-8.03969 6.46225,-6.21651 -1.31785,-3.15234 -5.14685,-4.11596 -7.76061,-1.65262 -2.30275,2.43295 -1.79009,6.31063 1.29836,7.86913 z"
                            />
                            <path
                            style={{fill:"#dba010",fillOpacity:1,stroke:"#dba010",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 140.06225,163.24327 21.98216,-22.55906 c -0.77676,-0.41879 -2.38019,-0.61365 -4.08553,1.1102 l -19.13996,18.96219 c 0.45418,0.34617 0.86862,1.17506 1.24333,2.48667 z"
                            />
                            <path
                            style={{fill:"#fff59d",fillOpacity:1,stroke:"#fff59d",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 151.0708,145.3872 c 1.16283,-0.23944 4.63927,-4.44508 6.97105,-6.68844 0.39549,-0.5232 0.33792,-1.4286 0.0628,-2.00967 -0.13279,-0.23684 -0.384,-0.23684 -0.75363,0 -6.0206,5.97758 -6.8851,7.63301 -6.28022,8.69811 z"
                            />
                            <path
                            style={{fill:"#fff59d",fillOpacity:1,stroke:"#fff59d",strokeWidth:0.0470001,strokeLinecap:"round",strokeOpacity:1}}
                            d="m 160.80515,132.95236 c -2.47642,-4.93439 -1.37076,-11.55675 3.39132,-15.57496 1.62239,-0.90016 3.10871,0.13607 1.82127,1.60146 -3.27618,3.61113 -4.45896,7.80841 -2.98311,12.59185 0.64896,2.29228 -1.00484,3.03544 -2.22948,1.38165 z"
                            />
                        </g>
                    </g>
                </g>
            </svg>
        </>
    );
}