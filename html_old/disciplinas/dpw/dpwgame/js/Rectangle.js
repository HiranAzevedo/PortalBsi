// classe que compara se duas áreas colidem
function Rectangle() {
    this.left = 0;
    this.top = 0;
    this.width = 0;
    this.height = 0;

    this.setup = function(left, top, width, height)   {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }

    this.intersects = function(other) {
        if (this.left + this.width < other.left) return false;
        if (this.top + this.height < other.top) return false;
        if (this.left > other.left + other.width) return false;
        if (this.top > other.top + other.height) return false;
        return true;
    }
}