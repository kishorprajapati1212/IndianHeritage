"use client";
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../pages_components/featcure_component/Map/Map'), {
  ssr: false,
});

const maps = () =>{
    return(
        <>
            <Map />
        </>
    )

}

export default maps;
