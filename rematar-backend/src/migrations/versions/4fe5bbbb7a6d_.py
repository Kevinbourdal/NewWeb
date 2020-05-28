"""empty message

Revision ID: 4fe5bbbb7a6d
Revises: 3329574e7faa
Create Date: 2020-05-28 17:23:25.235452

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4fe5bbbb7a6d'
down_revision = '3329574e7faa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('contact',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.Column('phone', sa.Integer(), nullable=True),
    sa.Column('body', sa.String(length=1000), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('contact')
    # ### end Alembic commands ###