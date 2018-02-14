import { select, line, extent, axisBottom, tsv, scaleLinear, axisLeft, namespace } from 'd3';


export class d3Chart {
    create(width, height, margin) {
        //Set the margin
        this.margin = margin;
        this.width = width - this.margin.left - this.margin.right;
        this.height = height - this.margin.top - this.margin.bottom;

        //Create an svg object
        this.svg = document.createElementNS(namespace.svg, 'svg');
        this.sSvg = select(this.svg);
        this.g = this.sSvg.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        this.x = scaleLinear().range([0, this.width]);
        this.y = scaleLinear().range([this.height, 0]);
    }

    setData(dataPath) {
        console.log(this.x)
        this.line = line()
            .x((data) => { return this.x(data.x) })
            .y((data) => { return this.y(data.y) });

        tsv(dataPath, (data) => {
            data.x = +data.x;
            data.y = +data.y;
            console.log(data);
            return data;
        }, (error, data) => {
            if (error) throw error;

            this.x.domain(extent(data, function(data) { return data.x; }));
            this.y.domain(extent(data, function(data) { return data.y; }));
          
            this.g.append('g')
                .attr('transform', 'translate(0,' + this.height +  ')')
               .remove();
                
            this.g.append('g')
                .call(axisLeft(this.y));
          
            this.g.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-width', 2)
                .attr('d', this.line);
        });
        console.log(this.sSvg);
    }
}

export default d3Chart;