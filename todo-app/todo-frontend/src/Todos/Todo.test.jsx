import { describe, it, expect} from "vitest";
import { render,screen } from "@testing-library/react";
import Todo from "./Todo";

describe('Todo', () =>{ 
    it('render a single todo',()=>{
        render(<Todo todo={{text:'test'}}/>)
        expect(screen.getByText('test')).toBeInTheDocument()
    })
})
