import * as React from 'react'
import { IProvenanceGraphTraverser, NodeIdentifier } from '@visualstorytelling/provenance-core'
import { ProvenanceGraphNode } from './provenance-react';

export interface IProps {
    provenance: IProvenanceGraphTraverser
}

export class ProvenanceGraph extends React.Component<IProps, {}> {
    onClick = (nodeIdentifier: NodeIdentifier) => {
        this.props.provenance.toStateNode(nodeIdentifier).then(() => {
            // do something after node has been made current
        });
    }

    render() {
        const root = this.props.provenance.graph.root
        return (
            <ol>
                <ProvenanceGraphNode node={root} onClick={this.onClick} />
            </ol>
        )
    }
}
