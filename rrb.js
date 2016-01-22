/*
 * The MIT License
 * 
 *  Copyright (c) 2016 Ionut Balcau
 * 
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 * 
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 * 
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

Array.prototype.clone = function(){
    return this.slice(0);
}
var rrb = (function () {

    var RRB_BITS = 4;
    var RRB_BRANCHING = 1 << RRB_BITS;
    var LEAF_NODE = true; var INTERNAL_NODE = false;  // node types
    
    var EMPTY_LEAF = { type: LEAF_NODE, len: 0, child: [] };
    var EMPTY_RRB = { length: 0, shift: 0, root: null, tail_len: 0, tail: EMPTY_LEAF }


    // public interface
    return {
        push : rrb_push, 
        create : rrb_create
    } 

  

    function rrb_push(rrb, val) {
        if (rrb.tail_len < RRB_BRANCHING) { // push to tail
            var new_rrb = clone(rrb);
            var new_tail = clone_leaf(rrb.tail);
            new_tail.len++;
            new_tail.child[new_rrb.tail_len++] = val;
            new_rrb.length++;
            new_rrb.tail = new_tail;
            return new_rrb;
        }
        var new_rrb = clone(rrb);
        new_rrb.length++;
        var new_tail = create_leaf(1);
        new_tail.child[0] = val;
        return push_down_tail(rrb, new_rrb, new_tail);
    }
   
   function push_down_tail(rrb, new_rrb, new_tail){
       var old_tail = new_rrb.tail;
       new_rrb.tail = new_tail;
       if (rrb.length <= RRB_BRANCHING) {
           new_rrb.shift = 0;
           new_rrb.root = old_tail;
           return new_rrb;
       }
   }
   
    function clone_leaf(source){
        return { type: source.type,
         len: source.len,
         child: source.child.clone() 
         }
    }
    
    function create_leaf(len){
        return { type: LEAF_NODE,
        len: len,
        child: new Array(len)
        }
    }
    
    function rrb_create() {
        return EMPTY_RRB;
    };
    
     function clone(source) {
        if (source == null) return null;
        var res = {};
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                res[key] = source[key];
            }
        }
        return res;
    }
})();