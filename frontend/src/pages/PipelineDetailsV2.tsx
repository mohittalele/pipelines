/*
 * Copyright 2021 The Kubeflow Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { commonCss } from '../Css';
import StaticCanvas from './v2/StaticCanvas';

interface PipelineDetailsV2Props {}

const PipelineDetailsV2: React.FC<PipelineDetailsV2Props> = () => {
  return (
    <div className={commonCss.page}>
      <div className={commonCss.page} style={{ position: 'relative', overflow: 'hidden' }}>
        <StaticCanvas elements={[]}></StaticCanvas>
        {/* <div>{pipelineIR}</div> */}
      </div>
    </div>
  );
};

export default PipelineDetailsV2;
