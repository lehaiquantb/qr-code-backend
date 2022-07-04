---
to: "<%= h.path(name) %>/dto/response/<%= h.responseDtoFileName(name) %>"
unless_exists: true
---
<%
 ClassName = h.ClassName(name);
 fileName =  h.fileName(name);
 varName = h.varName(name);
%>import { CommonListResponse, OmitProperty, ResponseDto } from '~common';
import { <%= ClassName %>Entity } from '~<%= fileName %>/entity/<%= fileName %>.entity';

export class <%= ClassName %>ResponseDto extends ResponseDto {
    id: number;

    @OmitProperty()
    private <%= varName %>?: <%= ClassName %>Entity;

    constructor(<%= varName %>?: <%= ClassName %>Entity) {
        super();
        this.<%= varName %> = <%= varName %>;
        this.id = <%= varName %>?.id;
    }
}

export class <%= ClassName %>ListResponseDto extends CommonListResponse<<%= ClassName %>ResponseDto> {

    constructor(<%= varName %>Entities?: <%= ClassName %>Entity[]) {
        super();
        this.items =
            <%= varName %>Entities?.map(
                (<%= varName %>) => new <%= ClassName %>ResponseDto(<%= varName %>),
            ) ?? [];
    }
}
