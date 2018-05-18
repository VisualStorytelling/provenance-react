import * as React from 'react'
import { IProvenanceGraphTraverser, NodeIdentifier } from '@visualstorytelling/provenance-core'
import { ProvenanceGraphNode } from './ProvenanceGraphNode';

export interface IProvenanceGraphProps {
    traverser: IProvenanceGraphTraverser
}

export class ProvenanceGraphTree extends React.Component<IProvenanceGraphProps, {}> {
    onClick = (nodeIdentifier: NodeIdentifier) => {
        this.props.traverser.toStateNode(nodeIdentifier).then(() => {
            this.forceUpdate();
        });
    }

    onGraphChange = () => {
        this.forceUpdate();
    }

    componentDidMount() {
        const graph = this.props.traverser.graph
        graph.on('nodeAdded', this.onGraphChange)
        graph.on('currentChanged', this.onGraphChange)
        graph.on('nodeChanged', this.onGraphChange)
    }

    componentWillUnmount() {
        const graph = this.props.traverser.graph
        graph.off('nodeAdded', this.onGraphChange)
        graph.off('currentChanged', this.onGraphChange)
        graph.off('nodeChanged', this.onGraphChange)
    }

    render() {
        const graph = this.props.traverser.graph 
        const root = graph.root
        const current = graph.current
        return (
            <ol>
                <ProvenanceGraphNode node={root} onClick={this.onClick} current={current}/>
            </ol>
        )
    }
}
