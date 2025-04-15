export function parseMathMLToTree(mathml) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(`<root>${mathml}</root>`, 'application/xml');

    function walk(node) {
        const tag = node.tagName;
        if (!tag) return null;

        if (['mi', 'mn'].includes(tag)) {
            console.log("a : ");
            console.log(tag);
            console.log(node);
            return { name: node.outerHTML, value: 10 + Math.random() * 20 };
        }

        if (tag === 'msup' && node.children.length === 2) {
            console.log("b : ");
            console.log(tag);
            console.log(node);
            return {
                name: node.outerHTML,
                children: [walk(node.children[0]), walk(node.children[1])]
            };
        }

        if (tag === 'mfrac' && node.children.length === 2) {
            console.log("c : ");
            console.log(tag);
            console.log(node);
            return {
                name: node.outerHTML,
                children: [walk(node.children[0]), walk(node.children[1])]
            };
        }

        if (tag === 'mrow' || tag === 'math') {
            console.log("d : ");
            console.log(tag);
            console.log(node);
            const children = Array.from(node.children);
            let groups = [], currentGroup = [];

            for (let child of children) {
                const content = child.textContent.trim();
                const isOp = child.tagName === 'mo' && ['=', '+', '-', '*', '/', '^'].includes(content);
                if (isOp) {
                    if (currentGroup.length) groups.push(currentGroup);
                    groups.push([child]);
                    currentGroup = [];
                } else {
                    currentGroup.push(child);
                }
            }
            if (currentGroup.length) groups.push(currentGroup);
            return groups.length === 1
                ? walkGroup(groups[0])
                : { name: node.outerHTML, children: groups.map(walkGroup) };
        }

        const children = Array.from(node.children).map(walk).filter(Boolean);

        return {
            name: node.outerHTML,
            children: children.length > 0 ? children : undefined,
            value: children.length === 0 ? 10 + Math.random() * 20 : undefined,
        };
    }

    function walkGroup(nodes) {
        if (nodes.length === 1) return walk(nodes[0]);
        const groupHTML = nodes.map(n => n.outerHTML).join('');
        return {
            name: groupHTML,
            children: nodes.map(walk).filter(Boolean)
        };
    }

    return {
        name: '<div></div>',
        children: Array.from(xml.documentElement.children).map(walk).filter(Boolean),
    };
}