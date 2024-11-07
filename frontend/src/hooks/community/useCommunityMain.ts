import React, { useState, useEffect } from "react";
import { ArticleItem } from "@/configs/community/articleItem";

const useCommunityMain = () => {
    const [feedState, setFeedState] = useState<boolean>(true);
    const [ changeHeader, setChangeHeader ] = useState<boolean>(true);
    const [ myFeedArticleItems, setMyFeedArticleItems ] = useState<ArticleItem[]>([]);


    const API_URL =import.meta.env.VITE_API_URL;

    const goMusicMainFeed = () => {
        setFeedState(false);
    };

    const goMainFeed = () => {
        setFeedState(true);
    };

    const handleChangeHeader = () => {
        setChangeHeader(false);
    }

    // 게시물 목록 가져오기
    const getArticleList = async () => {

        try {
            console.log('게시물 목록 가져올거임')
        //   const response = await axios.get(`${API_URL}/api/boards/${userSeq}`),
        //   headers: {
        //     access: `${token}`
        //   },
        // setMyFeedArticleItems(response.data);
        } catch(error) {
          console.error(error)
        }

    }

    // useEffect(() => {
    //     getArticleList();
    // }, []);

   

    return {
        feedState,
        changeHeader,
        myFeedArticleItems,
        goMusicMainFeed,
        goMainFeed,
        handleChangeHeader,
        getArticleList
    };
};

export default useCommunityMain;