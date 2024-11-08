import React, { useState } from "react";
import axios from "axios";
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
    const getArticleList = async (artistSeq: Number) => {
        const storedToken = localStorage.getItem('jwtToken');

        try {
            console.log('게시물 목록 가져올거임', artistSeq)
            const response = await axios.get(`${API_URL}/api/boards/${artistSeq}`,
            {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                },
            })
            // 배열에 넣어서 map으로 돌리기
            console.log('안녕ㄴㄹㄴㅇ', response.data)
        setMyFeedArticleItems(response.data);
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