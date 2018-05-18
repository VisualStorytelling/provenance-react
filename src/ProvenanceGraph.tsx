import * as React from 'react'
import { IProvenanceGraphTraverser } from '@visualstorytelling/provenance-core'
import { ProvenanceGraphNode } from './provenance-react';

export interface IProps {
    provenance: IProvenanceGraphTraverser
}

export class ProvenanceGraph extends React.Component<IProps, {}> {
    onClick = () => {

    }

    render() {
        return (
            <ol>
                <ProvenanceGraphNode node={this.props.graph.root} onClick={this.onClick} />
            </ol>
        )
    }
}
