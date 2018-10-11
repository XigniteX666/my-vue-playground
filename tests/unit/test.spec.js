import { mount } from '@vue/test-utils'
import TestComponent from '@/components/MyFirstComponent'
import { expect} from 'chai'


describe('MyFirstComponent', () =>{
    const wrapper = mount(TestComponent,{
        propsData:{
            seen: false,
            msg: 'SdASDASDADASDsds'
        }
    });

    it('renders the correct output based on the seen parameter', () => {
        expect(wrapper.html()).contains("<span>Now you see me</span>")
    })

    
})
