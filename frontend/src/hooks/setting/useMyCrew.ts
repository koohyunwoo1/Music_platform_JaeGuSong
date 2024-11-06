interface Crew {
    id: number;
  }

const useMyCrew = () => {

    const getMyCrews = async (crewsInfo: Crew[]) => {
        crewsInfo.map((crewSeq, index) => {
            console.log(crewSeq)
        })
    }
    return {
        getMyCrews
    }
}

export default useMyCrew;