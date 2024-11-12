package com.e106.reco.domain.workspace.dto;

import com.e106.reco.domain.workspace.entity.converter.WorkspaceState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class WorkspaceDto{
    private Long workspaceSeq;
    private String name;
    private String thumbnail;
    private WorkspaceState state;
    private String originTitle;
    private String originSinger;
    private Integer totalPage;
}